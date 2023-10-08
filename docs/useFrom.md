# `useForm` Function Documentation,

The `useForm` function accepts the following attributes as input:

1. `formName` (*required*):
   - **Description**: This attribute is required and provides a unique name for the form.
   - **Usage**: It is used to access data from the form context.
   
   -set the `formName`

```ts
import { useForm } from "@xmanscript/useform";

// assign `formName` inside component
  const { register } = useForm({
    formName: 'user_detail_form',
  });
```


   -access the form context using the `formName`

   ```ts
   import { useFormContextData } from "@xmanscript/useform";

   const userDetailFormData = useFormContextData('user_detail_form');
   ```

##### Learn more about using form context [here](./UsingContext.md)

2. `initialValues` (*required*):
   - **Description**: This attribute is also required and represents an object that initializes the form controls.
   - **Usage**: If provided empty object, it will result in a 'controlled input to be uncontrolled' warning. It is recommended to provide initial value for each of the controls of the form.
   
   -set initial values

```ts
 const { register } = useForm({
    formName: 'user_detail_form',
    initialValues:{ fullName: 'Harka Bahadur', gender: 'male' }
  });
```

3. `validationSchema`:
   - **Description**: This attribute can be a `Yup` object or a function and contains the validation logic for the values of the form.
   - **Usage**: If not provided, the form will proceed to submission on clicking the submit button without validation.

  -set validation schema with `yup` object
  ```ts
    const { register } = useForm({
 formName: 'user_detail_form',
 initialValues:{ fullName: 'Harka Bahadur', gender: 'male' },
 validationSchema: object({
   fullName: string().required('Full Name is Required'),
   gender: string().required('Gender is Required'),
 }),
});
  ```

-OR apply validation function

```ts
const { register } = useForm({
    formName: 'user_detail_form',
    initialValues:{ fullName: 'Harka Bahadur', gender: 'male' },
    validationSchema: (values) => {
      const error: Record<string, any> = {};
      if (!values.fullName) error.fullName = 'Full Name is Required';
      if (!values.gender) error.gender = 'Gender is Required';
      return error;
    },
  });
```

  

4. `submitHandler`:
   - **Description**: This is a function used to handle the form submission.
   - **Usage**: Define your custom logic for form submission using this function.

  ```ts
   const { register } = useForm({
    formName: 'user_detail_form',
    initialValues:{ fullName: 'Harka Bahadur', gender: 'male' },
    validationSchema: (values) => {
      const error: Record<string, any> = {};
      if (!values.fullName) error.fullName = 'Full Name is Required';
      if (!values.gender) error.gender = 'Gender is Required';
      return error;
    },
    submitHandler:(packet,sandBoxObject)=>{
      const { initialPacket, currentPacket, differencePacket }=packet;
      // handle form submition here
    }
  });
  ```
* `initialPacket` gives the initial value of the form
* `currentPacket` gives the current values in the form    
* `differencePacket` gives the difference in initial and current packet (values) of the form. (_can be useful while patching data_)
* `sandBoxObject` provide all the internam form methods to provide full control to the developers, the `parcel` object that we pass inside useForm will also be inside `sandBoxObject`. 
* just like `submitHandler` received the `sandBoxObject` other functions like `onSubmitDataInterceptor`, `setCustomValue` in `register` and `onChangeInterceptor` also receive `sandBoxObject` as second parameter.


##### Learn more about `sandBoxObject` [here](./sandBoxObject.md).

5. `onChangeInterceptor`:
   - **Description**: This function allows you to add custom logic for value changes in the form.
   - **Usage**: It is often used as a data interceptor before submitting data to the server. You can also use it as a pre-filler function to fetch and manipulate control values.

```ts
  const { register } = useForm({
    formName: 'user_detail_form',
    initialValues:{ fullName: 'Harka Bahadur', gender: 'male' },
    validationSchema: (values) => {
      const error: Record<string, any> = {};
      if (!values.fullName) error.fullName = 'Full Name is Required';
      if (!values.gender) error.gender = 'Gender is Required';
      return error;
    },
    onChangeInterceptor:(props, sandBoxObject)=> {
        const { values, touchedControls, touchedErrors, errors }=props;
        // add custom change logic and return the new value
        if(values.fullName==="Sita") values.gender="female";
        return values;
    },
  });
```

* `values` current values of the form.
* `touchedControls` object of controls that are touched.
* `touchedErrors` error object of controls that are touched.
* `errors` error object of the form wether the control is touched or not.

6. `controlFillers`:
   - **Description**: This attribute is used to add separate pre-filler functions for each form control.
   - **Usage**: Customize the initialization of individual form controls using this feature.

```tsx
const { register } = useForm({
    formName: 'user_detail_form',
    initialValues:{ fullName: 'Harka Bahadur', gender: 'male' },
    controlFillers: {
      gender: async () => {
        const genderList=await getGenderList();
        return genderList;
      },
    },
  });
```
* `controlFillers` is used to fill the individual contols with initial values. Here `gender` control has to be filled with the list of genders fetched from the server.

Well, we can fetch externally and fill it in. But if we passed it in `controlFillers` it will be easy to handle state of the form. We can track if the form is prefilling the controls by loking into `formState`, which has `isPrefillingForm` attrubute. 

##### Learn more about `formState` [here](./formstate.md).

7. `validateOnSubmit`:
   - **Description**: This attribute, by default, is set to `false`.
   - **Usage**: If set to `true`, the form will only validate during submission. If set to `false`, the form will validate both on value change and during submission. Validation during submission is always performed if a validation schema is provided.
```ts
  const { register } = useForm({
    formName: 'user_detail_form',
    initialValues: { fullName: 'Harka Bahadur', gender: 'male' },
    validateOnSubmit: true,
  });
```
By default form is validated when the value changes and before submiting form. When `validateOnSubmit` is `true` form will only be validated before submiting form.

8. `scrollToErrorControl`:
   - **Description**: This attribute, by default, is set to `true`.
   - **Usage**: If set to `false`, it will disable scrolling to the error control.

9. `touchOnChange`:
   - **Description**: This attribute, by default, is set to `false`.
   - **Usage**: When set to `true`, it enables the concept of touch controls, displaying errors only for controls that have been interacted with by the user. If set to `false`, controls must trigger changes using the `onTouchHandler` provided by `register`.

10. `isNestedForm`:
    - **Description**: If set to `true`, this attribute indicates that it is a nested form and will not execute the submit handler.

11. `parcel`:
    - **Description**: This attribute allows you to pass an object into every function that's passed into `useForm`.
    ```ts
        const { register } = useForm({
        formName: 'user_detail_form',
        initialValues:{ fullName: 'Harka Bahadur', gender: 'male' },
        parcel:{isSpecialForm: true},
        validationSchema: (values) => {
          const error: Record<string, any> = {};
          if (!values.fullName) error.fullName = 'Full Name is Required';
          if (!values.gender) error.gender = 'Gender is Required';
          return error;
        },
        submitHandler:(packet,sandBoxObject)=>{
          const { initialPacket, currentPacket, differencePacket }=packet;
          const { parcel }=sandBoxObject;
          // handle form submition here
        }
      });
    ```
* `parcel` is found inside `sandBoxObject`.
* Every function that receives `sandBoxObject` will receive the `parcel` object.

12. `settings`:
    - **Description**: This object accepts settings related to `DEBOUNCE_TIME`, `SCROLL_DELAY`.`DEBOUNCE_TIME` determines the debounce time for form validation. The default value is 300 milliseconds. `SCROLL_DELAY` determines the delay in scroll to error control.



The `useForm` function also provides the following output attributes:

- **`values`**:
  - *Description*: Holds the current values of the form.
- **`errors`**:
  - *Description*: Contains the current errors of the form.

- **`setErrors`**:
  - *Description*: A state function to change the error state.

- **`touchedErrors`**:
  - *Description*: Represents errors of only touched controls.

- **`formState`**:
  - *Description*: Provides the state of the form.

- **`register`**:
  - *Description*: A function used to hook the controls to the form.

- **`onSubmitHandler`**:
  - *Description*: Listens to the submit action of the form. It can also be called directly without passing any arguments.

- **`resetForm`**: 
  - *Description*: Resets form.


These attributes and options provide flexibility and control over form initialization, validation, and handling within your application.