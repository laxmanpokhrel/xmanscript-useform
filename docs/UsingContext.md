# Using Form Context

To make use of the form context, follow these steps:

1. Import the context provider:

```ts
import { FormProvider } from '@xmanscript/useform';
```
2. Wrap the components where you want to use the context of your forms. For instance, if you want to use the form context throughout your app, wrap the  component with the  `FormProvider` 
```ts
    <FormProvider>
        <App />
    </FormProvider>
```
The `FormProvider` can accept several settings that will apply to the forms using its context. These settings include:

* `DEBOUNCE_TIME`:The time to wait for form validation when values change, set to the default of `300` milliseconds.
* `SCROLL_DELAY`: The time to wait before scrolling to an error control, set to the default of 0 milliseconds.


_Note that these settings can be overridden when specified in a specific `useForm` hook._

Now, you can use the context of your form wherever you need it within the scope of the FormProvider. 

Multiple contexts can be applied for different sets of forms in an app. For example, if you have two categories of forms, such as `admin dashboard forms` and `public dashboard forms`, you may want `public dashboard forms` to have` debounced validation` and `scroll to error controls` for the ease of users, but you may not want `scroll to error controls` in `admin dashboard forms`. In this case, wrap the forms with two different FormProviders using different settings:. 

for `admin dashboard forms`
```ts
    <FormProvider settings={{ DEBOUNCE_TIME: 500, SCROLL_DELAY: 0 }}>
        <App />
    </FormProvider>
```
and for `public dashboard forms`
```ts
    <FormProvider settings={{ DEBOUNCE_TIME: 500, SCROLL_DELAY: 100 }}>
        <App />
    </FormProvider>
```

You can also set different DEBOUNCE_TIME if needed.

_Note: To prevent unexpected behavior, ensure that you do not overlap the scope of the `FormProvider`._

### Accessing the context of the forms

To access the context of the forms, use the useFormContextData hook. First, import it:

```ts
import { useFormContextData } from '@xmanscript/useform';
``` 

Then, get the context data for a specific form by providing its name:

```ts
const formContextDate = useFormContextData('<<formName>>');
```
Then, get the context data for a specific form by providing its name:

* `state`:  The state of the form.
* `errors`: The errors in the form.
* `touchedErrors`: The errors of the touched controls in the form.
* `values`: The errors of the touched controls in the form.
* `sandBoxObject`: An object provided by the `useForm` hook that includes all the functions that the hook internally uses, including the `parcel` object.


This documentation covers the usage of contextualized form data.
