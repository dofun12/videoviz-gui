import os
import zipfile
import json
from subprocess import check_output



def run_win_cmd(cmd):
  result = []
  process = subprocess.Popen(cmd,
                             shell=True,
                             stdout=subprocess.PIPE,
                             stderr=subprocess.PIPE)
  for line in process.stdout:
    result.append(line)
  errcode = process.returncode
  for line in result:
    print(line)
  if errcode is not None:
    raise Exception('cmd %s failed, see above for details', cmd)


def build_angular():
    check_output('cmd /k "ng build --prod --output-path gui --base-href /gui/"', shell=True)

def load():
    with open('./package.json', 'r') as read_file:
        return json.load(read_file)['version']

def zipdir(path, ziph):
    # ziph is zipfile handle
    for root, dirs, files in os.walk(path):
        for file in files:
            ziph.write(os.path.join(root, file))

if __name__ == '__main__':

    print('Initializing Zip')
    zipf = zipfile.ZipFile('release/gui-'+load()+'.zip', 'w', zipfile.ZIP_DEFLATED)
    zipdir('gui/', zipf)
    zipf.close()
