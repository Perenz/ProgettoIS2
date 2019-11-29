from PIL import Image,ImageFilter
import os

#Open the image file
im = Image.open("./routes/images/basket.jpg")

#Print some img information
#print(im.format, im.size, im.mode)


#L conversion, 8 bit pixels, black and white
out = im.convert('L')


#Split the im.filename (contain name and exstension)
#Get path+name and extension
filename, file_exstension = os.path.splitext(im.filename)

#Save the result with same name as before plus the code BW (blackwhite)
out.save(filename+"bw"+file_exstension)
out.show()

