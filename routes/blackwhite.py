from PIL import Image,ImageFilter
import sys
import os

#Open the image file
im = Image.open("./routes/images/basket.jpg")

#Print some img information
#print(im.format, im.size, im.mode)


#L conversion, 8 bit pixels, black and white
out = im.convert('L')


#Split the im.filename (contain name and exstension)
#Get path+name and extension
filename, file_format = os.path.splitext(im.filename)

#Add a code to the filename to recognize the modified image
filename += "bw"

#Save the result with same name as before plus the code BW (blackwhite)
out.save(filename+file_format)
#out.show()

print({"id": os.path.basename(filename), "format":file_format, "size": out.size})
sys.stdout.flush()

