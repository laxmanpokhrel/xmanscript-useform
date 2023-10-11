# `sandBoxObject` Documentation

The `sandBoxObject` is a crucial element of the form hook that empowers users to have fine-grained control over the behavior and internal state of a form. It is provided to every function passed into the `useForm` hook, primarily as the second parameter. This object encapsulates a variety of attributes and functions that facilitate the management of form data, errors, touched fields, control enablement, form state, control filling, and custom scenarios using a special parcel object.

## Attributes and Functions

### 1. `setValues`

- **Type**: `React.Dispatch<React.SetStateAction<Record<string, any>>`
- **Description**: This function is used to set the values of the form. It allows you to dynamically update the values of form fields, ensuring real-time synchronization with user input.

### 2. `setErrors`

- **Type**: `React.Dispatch<React.SetStateAction<Record<string, any>>`
- **Description**: This function serves the purpose of setting errors within the form. When errors occur during form submission or validation, you can use this function to provide immediate feedback to users by highlighting erroneous fields.

### 3. `setTouchedErrors`

- **Type**: `React.Dispatch<React.SetStateAction<Record<string, any>>`
- **Description**: Similar to `setErrors`, this function focuses on setting errors but specifically for fields that have been touched. It's especially useful for displaying errors only after a user interacts with a field.

### 4. `setTouchedControls`

- **Type**: `React.Dispatch<React.SetStateAction<Record<string, boolean>>`
- **Description**: This function is designed to manage the state of controls that have been touched. By marking controls as touched, you can control the timing of error displays and other actions related to user interaction.

### 5. `setControlEnable`

- **Type**: `React.Dispatch<React.SetStateAction<Record<string, boolean>>`
- **Description**: Use this function to control the enablement state of form controls. For instance, you can disable specific fields based on certain conditions or user actions.

### 6. `setFormState`

- **Type**: `React.Dispatch<React.SetStateAction<formStateType>>`
- **Description**: This function allows you to set the overall state of the form. It's useful for managing the form's global behavior and state transitions, such as submission in progress or submission success.

### 7. `setControlFilling`

- **Type**: `React.Dispatch<React.SetStateAction<Record<string, boolean>>`
- **Description**: This function is related to controlling the filling state of form controls. You can use it to indicate whether a control is currently being filled by the user, which can be valuable in various dynamic UI scenarios.

### 8. `resetForm`

- **Type**: `() => void`
- **Description**: This function enables you to reset the entire form, restoring it to its initial state. This is handy for allowing users to start over or clear their inputs.

### 9. `parcel`

- **Type**: `any | null`
- **Description**: The `parcel` attribute is a versatile object that can be passed to the form by the developer based on specific requirements. It can be utilized in custom scenarios and to extend the functionality of the form hook. For instance, you might use it to pass additional data or configuration options to the form.

## Use Cases

The `sandBoxObject` is a powerful tool for form management, offering fine control over various aspects of the form's behavior and state. Here are some common use cases:

1. **Dynamic Form Updates**: You can use `setValues` to update form field values based on user actions, such as autocomplete suggestions or dynamic data loading.

2. **Error Handling**: `setErrors` and `setTouchedErrors` allow you to handle and display errors when users submit invalid data.

3. **Control Interaction**: `setTouchedControls` and `setControlEnable` help manage the interaction state of form controls, enabling or disabling them as needed.

4. **Form State Management**: `setFormState` is essential for controlling the overall state of the form, especially during submission processes or multi-step forms.

5. **Control Filling State**: Use `setControlFilling` to track which controls are actively being filled, which can be helpful for user guidance or dynamic UI changes.

6. **Form Reset**: The `resetForm` function provides a straightforward way to allow users to clear their inputs and start over.

7. **Custom Scenarios**: The `parcel` attribute is a versatile mechanism for introducing custom behaviors and data into the form hook, extending its capabilities to meet unique requirements.

In summary, the `sandBoxObject` is a comprehensive toolset that empowers developers to create highly interactive and customizable forms, making it a valuable asset for building user-friendly, dynamic, and feature-rich web applications.

_Note: These attributes and functions interact with React state directly or indirectly, so it is strongly advisable to use them within the component. While you can employ them in regular functions since they are essentially references, it's worth noting that in certain situations, they may lose their context within the React lifecycle, potentially leading to unexpected behavior._