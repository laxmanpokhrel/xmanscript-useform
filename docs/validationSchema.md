# `useForm`

The `useForm` function accepts the following attributes as input:

1. **`formName`** (*required*):
   - *Description*: Provides a unique name for the form.
   - *Usage*: Used to access data from the form context.

2. **`initialValues`** (*required*):
   - *Description*: An object that initializes form controls.
   - *Usage*: It's required to prevent a 'controlled input to be uncontrolled' warning. Recommended to provide.

3. **`validationSchema`**:
   - *Description*: Can be a `Yup` object or function, containing validation logic for form values.
   - *Usage*: If not provided, the form proceeds to submission on clicking the submit button without validation.

4. **`submitHandler`**:
   - *Description*: A function to handle form submission.
   - *Usage*: Define custom logic for form submission using this function.

5. **`onChangeInterceptor`**:
   - *Description*: A function to add custom value change logic.

6. **`onSubmitDataInterceptor`**:
   - *Description*: A function to handle data manipulation before sending it to the server.

7. **`preFillerFn`**:
   - *Description*: Used to fetch and fill the form controls.

8. **`controlFillers`**:
   - *Description*: Used to add separate pre-filler functions for each form control.

9. **`validateOnSubmit`**:
   - *Default*: `false`.
   - *Description*: If `true`, validates the form only during submission. If `false`, validates on value change and during submission. Always validates during submission if a validation schema is provided.

10. **`scrollToErrorControl`**:
    - *Default*: `true`.
    - *Description*: Controls scrolling to error elements. Set to `false` to disable.

11. **`touchOnChange`**:
    - *Default*: `false`.
    - *Description*: Enables the touch control concept, displaying errors for touched controls (controls interacted with by the user).
    - *Usage*: If `true`, a control is marked as "touched" on the first value change. If `false`, controls must trigger changes using the `onTouchHandler` provided by `register`.

12. **`isNestedForm`**:
    - *Description*: If `true`, indicates it's a nested form and won't execute the submit handler.

13. **`parcel`**:
    - *Description*: An object to pass into every function within `useForm`.

14. **`metadata`**:
    - *Description*: An object that includes a `DEBOUNCE_TIME` setting, which sets the form validation time (default: 300 milliseconds).

These attributes and options provide flexibility and control over form initialization, validation, and handling form within your application.
