from PIL import Image, ImageOps
import os 

#Open the image file
im = Image.open('./routes/images/basket.jpg')

#Use the ImageOps module to invert the colors
out = ImageOps.invert(im)

#Split the im.filename (contain name and exstension)
#Get path+name and extension
filename, file_exstension = os.path.splitext(im.filename)

#Save the result with same name as before plus the code ic (invertedcolors)
out.save(filename+"ic"+file_exstension)
out.show()