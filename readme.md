# @xmanscript/useform Documentation

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)


#
`@xmanscript/useform` is a weekend project developed by Laxman Pokhrel. It's a versatile hook designed to simplify form-related operations in React applications. One of its key features is the ability to use any custom React component as a form control, offering tremendous flexibility.

Another important feature of this hook is its ability to provide a context for the form it's integrated into. This context makes it easy to access form values, errors, and status from anywhere within the provider, greatly simplifying the handling of multi-step forms.


# Installation Guide
Installation guide for **@xmanscript/useform**, a versatile npm package that provides various utilities for your JavaScript projects.

## Installation
You can install **@xmanscript/form** using one of the following package managers: npm, yarn, or pnpm.

### npm

To install **@xmanscript/useform** using npm, open your terminal and run the following command:

```shell
npm install @xmanscript/useform
```
### yarn

To install **@xmanscript/useform** using npm, open your terminal and run the following command:

```shell
yarn add @xmanscript/useform
```
### pnpm

To install **@xmanscript/useform** using npm, open your terminal and run the following command:

```shell
pnpm add @xmanscript/useform
```


#


## Key Features

- **Custom Form Controls**: You can seamlessly integrate any custom React component as a form control. (For guidelines on designing such components, refer to the `@xmanscript/useform` friendly [component design guide](./docs//ComponentDesignGuide.md).)

- **Contextual Form Data**: The hook's provider offers a context that holds form values, errors, and status, streamlining multi-step form handling.

- **Persisting Form Data**: The hook can persists the data filled in the form even if the form mounts and unmounts from the dom. It can be manaully cleared.

- **Error Scrolling**: By default, the form scrolls to the first error control upon submission (this can be disabled if needed).

- **Validation**: You can perform validation using both "Yup" and your own custom validation functions.

- **Prefilling**: Easily prefill the entire form or individual controls with separate functions.

- **Form State Management**: Access and monitor various form states, including isSubmitting, hasError, submissionError, isPrefillingForm, and more.

- **Validation Logic**: Validation logic is handled by default, preventing submission in case of validation errors.

- **Error Generation**: Errors can be generated during value changes or when submitting the form.

- **Parcel Object**: Pass a parcel object to each function as a parameter.

- **Debounced Validation**: Validation is debounced by default, but you can configure it to run only upon form submission.

- **Interceptors**: Introduces the concept of interceptors to separate data manipulation logic. There are two types: 
  - **onChangeInterceptor**: Customize logic for changing values in the form.
  - **onSubmitDataInterceptor**: Manipulate data before it's sent to the server.

With `@xmanscript/useform`, handling forms in your React applications becomes more flexible and efficient.


Let's [Get Started 🚀](./docs/GettingStarted.md)