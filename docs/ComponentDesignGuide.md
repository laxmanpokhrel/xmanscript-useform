# Component Design Guide

When designing a `CustomFormControl`, there are two different scenarios to consider:

1. **Wrapping Native HTML Elements:** In this scenario, you'll wrap a native HTML form element like `input`, `select`, etc., with your custom styles and other elements to meet your specific requirements.

2. **Wrapping Non-Native Elements:** The `CustomFormControl` can also be any component other than native HTML elements. It could be a `map`, `chart`, a custom dropdown with extended features, or anything else you need.

The `useForm` hook is designed to seamlessly integrate with both of these scenarios, making it versatile and adaptable for various use cases.

## CustomFormControl by Wrapping Native HTML Elements

In this scenario, you'll create a `CustomFormControl` by wrapping a native HTML element. You can style it and add additional elements as needed to enhance its functionality and appearance.

**Example: Customizing a Textarea Component**

Let's take a `Textarea` component from [shadecn/ui](https://ui.shadcn.com/docs/components/textarea) and modify it according to our needs. This component uses a native HTML form element (`<textarea>`). When you register this input field using the `register` method, you don't need to configure anything for it to work seamlessly with `useForm`.

```ts
import React from 'react';
import { cn } from '@Utils/index';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'bg-white w-full rounded-md border border-input px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export default Textarea;
```

This component uses nativr HTML form element ie: `input`. In this case if you register this input field with `register` method you don't need to congigure anything for it to sync in with `useForm` features.

```ts
    <Textarea {...register('<<controlName>>')} />
```
And you are good to go.

## CustomFormControl by Wrapping Any Element

When you need to create a CustomFormControl by wrapping any element other than native HTML elements, such as `maps`, `charts`, custom dropdowns, and more, the `useForm` hook provides the flexibility to seamlessly integrate with your custom components.

**Example: Extending an Input Interface**

To make your custom component compatible with `useForm`, extend the named `IRegisterOutputProps` to the input props of the component. For instance, consider the following example where we extend `IRegisterOutputProps` to an interface `IDropDownProps` for a `DropDown` component:
```ts
export interface IDropDownProps extends Partial<IRegisterOutputProps> {
  options: IDropDownData[];
  choose?: string;
  multiple?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  dropDownSize?: 'lg' | 'sm' | 'lg-icon' | 'sm-icon' | 'drop-lg' | 'drop-sm' | 'drop-md';
  placeholderClassName?: string;
}
``` 
By extending `IRegisterOutputProps` and combining them with your custom props, you can perfectly sync your custom component with `useForm`.

**For an Instance:** ISuppose you have a component named CommandInput that exposes a function to receive changed data. You can integrate it like this:
```tsx
<CommandInput
    placeholder="Search data..."
    // Value prop to sync with custom logic
    value={value}
    // Custom onChangeCapture function
    onChangeCapture={(e: ChangeEvent<any>) => {
        // Custom logic to handle change
        if (onChange) {
            onChange(e);
        }
    }}
 />
```
In this example, `value` and the custom `onChangeCapture` function are the two essential aspects you need to integrate with your custom `CommandInput` component.

You can also take advantage of other props like `hasError`, `error`, `disabled`, `touchedError`, and `touched` to make your component more user-friendly when using `useForm`. You can learn more about these props [here](./register.md).

Here are some useful tips:
 1. If you've set `touchOnChange` to `true` when declaring `useForm`, you don't need to trigger `onTouchHandler`. When it's set to true, `useForm` will consider the control as touched as soon as its value changes.
 2. Instead of using `error` to display an `error` message when the component changes, use `touchedError`. `error` will contain an   message or any error value whenever any component changes its value.

This approach allows you to create `CustomFormControl` components tailored to your specific requirements, whether they involve native HTML elements or custom components.

With this guide, you can efficiently design and implement `CustomFormControl` components to suit your project's unique requirements.

