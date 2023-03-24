---
title: 'Axios: Interceptors'
datetime: 2020-01-01
img: https://miro.medium.com/max/700/1*U9tVpGwDxXPqDcQXfBIFEA.png
alt: As a developer have you ever wanted to quickly manipulate a Axios request?
description: As a developer have you ever wanted to quickly manipulate a Axios request?
tags: ['axios', 'javascript']
show: true
---

# Axios: Interceptors
## As a developer have you ever wanted to quickly manipulate a Axios request?

You might be using the basics of Axios like I was untill more complicated features was needed. 

To intercept a request before it is sent: 

```
axios.interceptors.request.use(request=> {
  // Do something with the data eg
  console.log(request) // request has lots of options as per usual request objects
  return r equest// interceptors need to return the request
})
```

It can be very useful for debugging each request and you can check for headers or other data you need. An example would be you forgetting to format a value for a header value. Like base64 encoding. It's really simple to get a list of headers: `req.headers`

Of course you also have a response and this can also be intercepted:

```
axios.interceptors.response(response => {
  response.
})
```
	

For each `request` and `response` interceptors the second argument is an error function. 

```
axios.interceptors.response.use(req => {
  // any status code within the 200 range will go here
  ... // if no error
},error => {
// any other HTTP codes will be sent to the error function
  if(error.status === 401) {
    ... // do something with the "Unauthorized Error"
    // or use your error handle function and pass it the error object'
  }
} )
```

This is very useful, kind of like middleware. It could be used to check credentials or a JWT expiry.