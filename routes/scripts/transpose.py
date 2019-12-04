from PIL import Image,ImageFilter
import sys
import os

#Check for correct number of parameters
if len(sys.argv) == 3:
    #Open the image file
    im_name = sys.argv[1]

    #Tells the direction of the trasponse
    side = sys.argv[2]
else:
    print({"status":"ERROR", "msg":"Wrong number of parameters", "given":len(sys.argv)})
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


#Trasposing image
if side == 'x':
    out = im.transpose(Image.FLIP_LEFT_RIGHT)
elif side == 'y':
    out = im.transpose(Image.FLIP_TOP_BOTTOM)
elif side == 'xy' or side == 'yx':
    #Give a standard value to xy and yx dirs
    side = 'xy'
    out = im.transpose(Image.FLIP_LEFT_RIGHT)
    out = out.transpose(Image.FLIP_TOP_BOTTOM)
else:
    print({"status":"ERROR", "msg":"Can't recognize the parameter side"})
    sys.stdout.flush()
    sys.exit()



#Split the im.filename (contain name and exstension)
#Get path+name and extension
filename, file_format = os.path.splitext(im.filename)

#Add a code to the filename to recognize the modified image
filename += '_tr'+side

#Save the result with same name as before plus the code BW (blackwhite)
out.save(filename+file_format)
#out.show()

#Send to JS caller a message that means the operation ended well
print({"status":"SUCCESS", "id": os.path.basename(filename), "format":file_format, "size": out.size})
sys.stdout.flush()

