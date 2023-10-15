# `register` Method Documentation

The generic implementation if the `register` method look like this:
```tsx
<YourFormControl
    controlType="textArea"
    label="setCustomChange"
    placeholder='Type "laxman" to see the magic!'
    {...register('fullName', {
    setCustomValue: (value) => {
        // here value is only of that control.
        if (value === 'kaaji shayab') return 'He is the DON! 😎 ';
        return value;
    },
    setEnable:(bindValue, bindValues)=>{
        // apply control enabling and disabling logic here 
        // should return `boolean` value 
        return true;
        }
    })}
/>
```


## Attributes for Custom Form Control Registration

When designing a custom form control that integrates with the `@xmanscript/useForm` library, it's important to understand the attributes passed during registration:

1. **First Parameter (`string`)**:
   - `fullName` in above example is the name of the control, used to register it with the `useForm` hook.
   - The value of this control will be saved in the corresponding key within the `bindValues` object.

2. **Second Parameter (Object with Two Functions)**:
    1. `setCustomValue`:
     - This function allows you to set a custom value for the form control when its value is changing. For example, if a user types "kaaji shayab," the control can receive the value "He is the DON! 😎."
     - It has various use cases beyond this example.

    2. `setEnable`:
       - This function provides a way to implement control enabling and disabling logic based on its value changes.
       - It receives:
         - `bindValue`: The current value of the control.
         - `bindValues`: The values of all controls in the form, useful for enabling or disabling controls based on others.


## Output Attributes Provided by the `register` Method

While designing a custom form control that is `@xmanscript/useform` friendly, you should utilize these output attributes for seamless integration with the features `@xmanscript/useForm` provides:

- `id` (type: `string`):
  - Represents a unique identifier for the control.
  - Useful for scrolling to the error control when an error occurs during validation.

- `touchederror` (type: `any`):
  - This prop will receive an error if the control is touched and has an error while validating.

- `error` (type: `any`):
  - This prop will receive an error if the control has an error during validation, whether it is touched or untouched.

- `haserror` (type: `boolean`):
  - A boolean value indicating whether the form control has any error during validation.

- `touched` (type: `boolean`):
  - A boolean value indicating whether the element has been touched.

- `enable` (type: `boolean`):
  - A boolean value indicating whether the element is enabled. By default, it is `true`. Control enabling or disabling logic can be implemented using the `setEnable` method.

- `value` (type: `any`):
  - The value of the control used for two-way binding.

- `onTouchHandler` (type: `() => void`):
  - A function that should be executed when the element is touched. If `touchOnChange: true` is passed while setting up `useForm`, there's no need to execute this method, as the element will be considered touched when its value changes.

- `onChange` (type: `(e: any) => void`):
  - A function that should be executed when a change event occurs.

- `controlname` (type: `string`):
  - Represents the name of the control.

- `controlfilling` (type: `boolean`):
  - A boolean value indicating whether the control is filling.

Developers using TypeScript will need to extend or type the props received by their custom form control with `IRegisterOutputProps` provided from `@types` of the hook.
