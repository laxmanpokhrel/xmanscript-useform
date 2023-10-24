import * as React from 'react';
import formContext from '../context/formContext';

export default function usePreventUnload(formName: string, preventUnload: boolean) {
  const formContextState = React.useContext(formContext);
  const { hasChanges } = formContextState?.formContextData[formName]?.state || { hasChanges: false };
  const { isSubmitionSuccess } = formContextState?.formContextData[formName]?.state || { isSubmitionSuccess: false };
  return React.useEffect(() => {
    if (!preventUnload)
      window.addEventListener('beforeunload', e => {
        if (hasChanges && !isSubmitionSuccess) {
          e.preventDefault();
          e.returnValue = 'You have unsaved changes. Are you sure you want to leave this page?';
        }
      });

    return () => {
      if (!preventUnload) window.removeEventListener('beforeunload', () => {});
    };
  }, [hasChanges, preventUnload, isSubmitionSuccess]);
}
