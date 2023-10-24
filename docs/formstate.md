

## `useForm` State Documentation

When working with forms using `useForm`, you can access various states to handle different aspects of form management. These states are as follows:

1. **`isPreFillingForm` (boolean):**
   - Indicates whether the form is in the process of prefilling.
   - `true` if prefilling is in progress, `false` otherwise.
   - Pre-filling involves executing functions provided in the `prefill` object.

2. **`isSubmittingForm` (boolean):**
   - Signals whether the form is currently being submitted.
   - `true` during form submission, `false` otherwise.

3. **`isSubmissionError` (boolean):**
   - Indicates whether a submission error has occurred in the form.
   - `true` if there is a submission error, `false` otherwise.

4. **`submissionError` (error object):**
   - Provides an error object in case of a submission error.
   - Contains error details if `isSubmissionError` is `true`.

5. **`hasError` (boolean):**
   - Determines whether the form currently has any errors.
   - `true` if there are errors in the form, `false` if it's error-free.

6. **`hasChanges` (boolean):**
   - Determines whether the form has any changes in it's values.
   - `true` if there are changes in the form, `false` if it's change-free.

7. **`isSubmissionSuccess` (boolean):**
   - Indicates whether a submission was successful.
   - `true` if there is a submission success, `false` otherwise.
