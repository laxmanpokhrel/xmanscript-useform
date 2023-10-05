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
Let's discuss the attributes that we passed in above example

- First Parameter:  `fullName` is the name of that control, with which it will be registered to `useForm` hook. Value of that control will be saved in that particular key in `bindValues` object.
- Second Parameter: Second Parameter is an object that takes in two functions:

    1. `setCustomValue`: This function is to setCustomValue to the form when it's value is changing. In above example when the user types `kaaji shayab` the control will get  `He is the DON! 😎` as a value. It has a lot more usecases.
    2.  `setEnable`: This function provides a way to add control enabling and disabling logic when its value changes. Here we get:
        * `bindValue`: gives the current value of the control
        * `bindValues`: gives value of all controls. This is useful when we have to enable or disable some controls based on other control of the form.


Let's discuss about the output attributes the register method provides:

NOTE: While designing any custom form control which is `@xmanscript/useform` friendly you should utilize all these props for the control to perfectly sync with the features `@xmanscript/useForm` provides.

- `id` (type: `string`): Represents an unique identifier of the control. It is applicable while scrolling to the error control. If your custom form control doesnot consume this id `useForm` wont be able to scroll to it when error occures.
- `touchederror` (type: `any`): This prop will receive error if the control is touched and has has error while validating.
- `error` (type: `any`): This prop will receive error if the control has error while validating wether it is touched or untouched.
- `haserror` (type: `boolean`): A boolean value indicating whether the form control has any error while validating.
- `touched` (type: `boolean`): A boolean value indicating whether the element has been touched.
- `enable` (type: `boolean`): A boolean value indicating whether the element is enabled. By default it is `true`. If we have to apply logic on enabling or disabling control then we put our logic in `setEnable` method. 
- `bindvalue` (type: `any`): Value of the control used for `two-way` binding.
- `value` (type: `any`): Same as `bindValue`. Just provided different name for same thing to avoid name clash.
- `onTouchHandler` (type: `() => void`): A function that should be executed when the element is touched. If we pass `touchOnChange:true,` while setting up `useForm` no need to execute this method, because element will be considered touched when it's value changes.
- `onChangeHandler` (type: `(e: any) => void`): A function that should be executed when a change event occurs.
- `onChange` (type: `(e: any) => void`): Same as onChangeHandler
- `controlname` (type: `string`): Represents the name of the control.
- `controlfilling` (type: `boolean`): A boolean value indicating whether the control is filling.

For developers using `typescript` will have to extend or simply type the props received by your `form control` with `RegisterOutputType` provided from `@types` of the hook. 
