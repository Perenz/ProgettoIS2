/images

​	POST

​	Upload the image

​	Return a json with different parameters:

* id
* original_filename
* format
* size
* ...




/videos

​	POST

​	Upload the video

​	Return a json with different parameters:

* id
* original_filename
* format
* size
* ...

 

/images/:id

​	GET

​	Return bytecode of the image



/filters

​	GET

​	Return a json with a list as a parameter, each element  	contains info about a filter, such as:

* name
* path
* schema
* description



/filters/:filter_name?source=''?OPTIONAL

​	POST

​	Generate a new image which is the result of a filter application to an existing image

​	Return a json with different parameters:

* id
* format
* size
* ...



/format?source=''&format=''

​	POST

Generate a new image of the new specified format

​	Return a json with different parameters:

* id
* format
* size
* ...





/edits

GET

​	Return a json with a list as a parameter, each element  	contains info about a transformation, such as:

* name
* path
* schema
* description



/edits/:edit_name?source=''?OPTIONAL

​	POST

​	Generate a new video which is the result of the applied transformation to the source video

​	Return a json with different parameters:

* id
* format
* size
* ...