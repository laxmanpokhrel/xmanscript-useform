# let's get started. 🚀

## 1. Import the hook
```ts
import { useForm } from '@xmanscript/useform';
```
* Get the register method out of it and start registering the form controls t0 the hook:
##### Learn about `useForm`  [here](./useFrom.md)

## 2. Register Form Controls
```ts
  const { register } = useForm({ formName: 'test form', initialValues: {control_one:"",control_two:"",control_three:""} });
```
`formName` and `initialValues` are required attributes for useForm. `initialValues` can be empty, but it's recommended to avoid a 'controlled input to be uncontrolled' warning.

```tsx
// Register form controls to the hook
-
<YourCustomFormControl
    {...register('control_one')}
/>
<YourCustomFormControl
    {...register('control_two')}
/>
<YourCustomFormControl
    {...register('control_three')}
/>
```

On doing so `YourCustomFormControl` is now bind with `useForm` hook.
### 
Note that, `YourCustomFormControl` should be `@xmanscript/useform` friendly component. For `@xmanscript/useform` friendly component design refer [here](./ComponentDesignGuide.md).

###
Disclamer: The idea of registering all the props using `register('gender')` is the incfuence of `react-hook-form` (https://react-hook-form.com) 😉.
##### Learn about `register` [here](./register.md).

## 3. Validation of Values

For value validation, you can pass in a validation schema to the useForm hook using Yup:
```ts
// import needed instances from yup
import { object, string } from 'yup';

const { register } = useForm({
    formName: 'test form',
    initialValues: {control_one:"",control_two:"",control_three:""},
    validationSchema: object({
      control_one: string().required('Name is Required'),
    }),
});
```
Alternatively, you can define your custom validation function:

```ts
const { register } = useForm({
    formName: 'test form',
    initialValues: {control_one:"",control_two:"",control_three:""},
    validationSchema: (values) => {
      const error: Record<string, any> = {};
      if (!values.control_one) error.control_one = 'Control One Not provided';
      return error;
    },
});
```
If no validation schema is provided, the form will be submitted directly when clicking the submit button.
##### Learn more about `validationSchema` [here](./validationSchema.md).

## 4. Submiting the Form

To submit the form, `@xmanscript/useform` provides the `onSubmitHandler` method. You need to pass a `submitHandler` function to the hook:
```jsx
const { register, onSubmitHandler } = useForm({
    formName: 'test form',
    initialValues: {control_one:"",control_two:"",control_three:""},
    validationSchema: object({
      control_one: string().required('Name is Required'),
    }),
    submitHandler: async (props) => {
      await postData(props.currentPacket);
    },
});

<form onSubmit={onSubmitHandler}>
  {/* ...form controls */}
</form>
```
The `submitHandler` function receives the form values and additional props, such as `differencePacket` and `initialPacket`, to simplify form data handling.

##### learn more about `submitHandler` [here](./submitHandler.md).

This guide covers the basic workflow to implement `@xmanscript/useform`. For detail documentation navidate to links provided in individual section of this guide above.