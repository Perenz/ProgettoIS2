from PIL import Image
import sys

name = sys.argv[1]

out = 'new_' + name

Image.open(name).convert('RGB').save(out, format='jpeg')