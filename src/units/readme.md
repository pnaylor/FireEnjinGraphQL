# Units

Units are the simple pieces of functionality for your application. They should be pure with taking in only what they need and returning something testable.

# Common Errors

## Application has not been initialized. Call Initialize() method

This occurs when you try to import your models before you initialize firebase. Always connect the database before importing and working with the model. (See Image Below)

![image](https://user-images.githubusercontent.com/4184680/66259700-c09bb600-e779-11e9-84c8-eb26ac2a9ca7.png)
