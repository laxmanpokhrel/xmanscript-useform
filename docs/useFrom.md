# `useForm`

The `useForm` function accepts the following attributes as input:

1. `formName` (*required*):
   - **Description**: This attribute is required and provides a unique name for the form.
   - **Usage**: It is used to access data from the form context.

2. `initialValues` (*required*):
   - **Description**: This attribute is also required and represents an object that initializes the form controls.
   - **Usage**: If provided empty object, it will result in a 'controlled input to be uncontrolled' warning. It is recommended to provide initial value for each of the controls of the form.

3. `validationSchema`:
   - **Description**: This attribute can be a `Yup` object or a function and contains the validation logic for the values of the form.
   - **Usage**: If not provided, the form will proceed to submission on clicking the submit button without validation.

4. `submitHandler`:
   - **Description**: This is a function used to handle the form submission.
   - **Usage**: Define your custom logic for form submission using this function.

5. `onChangeInterceptor`:
   - **Description**: This function allows you to add custom logic for value changes in the form.
   - **Usage**: It is often used as a data interceptor before submitting data to the server. You can also use it as a pre-filler function to fetch and manipulate control values.

6. `controlFillers`:
   - **Description**: This attribute is used to add separate pre-filler functions for each form control.
   - **Usage**: Customize the initialization of individual form controls using this feature.

7. `validateOnSubmit`:
   - **Description**: This attribute, by default, is set to `false`.
   - **Usage**: If set to `true`, the form will only validate during submission. If set to `false`, the form will validate both on value change and during submission. Validation during submission is always performed if a validation schema is provided.

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

12. `settings`:
    - **Description**: This object accepts a `DEBOUNCE_TIME` setting, which determines the debounce time for device validation. The default value is 300 milliseconds.

The `useForm` function also provides the following output attributes:

- **`bindValues`**:
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
  - *Description*: Listens to the submit action of the form.

These attributes and options provide flexibility and control over form initialization, validation, and handling within your application.