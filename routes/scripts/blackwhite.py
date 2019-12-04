from PIL import Image,ImageFilter
import sys
import os

#Check for correct number of parameters
if len(sys.argv) == 2:
    #Open the image file
    im_name = sys.argv[1]
else:
    sys.stderr.write("Wrong number of parameters")
    #sys.stderr.flush()
    sys.exit()

#accept only jpg images TODO
try:
    #Try open the image which name was passed as param
    im = Image.open(im_name)
except IOError:
    #If the image does not exist
    #Abort and tell the js caller
    sys.stderr.write("source name specified does not exist")
    #sys.stderr.flush()
    sys.exit()

#Print some img information
#print(im.format, im.size, im.mode)


#L conversion, 8 bit pixels, black and white
out = im.convert('L')


#Add a code to the filename to recognize the modified image
im_name += "_bw"

#Save the result with same name as before plus the code BW (blackwhite)
im_format = im.format

out.save(im_name+'.'+im_format)
#out.show()

#Send to JS caller a message that means the operation ended well
print(im_name+'.'+im_format, end='')
sys.stdout.flush()

