from PIL import Image,ImageFilter
import sys
import os

#Check for correct number of parameters
if len(sys.argv) == 3:
    #Open the image file
    im_name = sys.argv[1]

    #Tells the angle of the rotation
    
    angle = int(sys.argv[2])
else:
    print({"status":"ERROR", "msg":"Wrong number of parameters"})
    sys.stdout.flush()
    sys.exit()

#accept only jpg images TODO
try:
    #Try open the image which name was passed as param
    im = Image.open("./routes/images/"+im_name+".jpg")
except IOError:
    #If the image does not exist
    #Abort and tell the js caller
    print({"status":"ERROR", "msg":"source name specified does not exist"})
    sys.stdout.flush()
    sys.exit()


#Rotating image
out = im.rotate(angle)

#Split the im.filename (contain name and exstension)
#Get path+name and extension
filename, file_format = os.path.splitext(im.filename)

#Add a code to the filename to recognize the modified image
filename += '_rot'

#Save the result with same name as before plus the code BW (blackwhite)
out.save(filename+file_format)
#out.show()

#Send to JS caller a message that means the operation ended well
print({"status":"SUCCESS", "id": os.path.basename(filename), "format":file_format, "size": out.size})
sys.stdout.flush()

