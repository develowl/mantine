import React from 'react';
import { useListState } from '@mantine/hooks';
import { useMantineTheme, Checkbox } from '@mantine/core';

function randomId() {
  return Math.random().toString(36).substr(2, 9);
}

const initialValues = [
  { label: 'Receive email notifications', checked: false, key: randomId() },
  { label: 'Receive sms notifications', checked: false, key: randomId() },
  { label: 'Receive push notifications', checked: false, key: randomId() },
];

export function IntermediateCheckbox() {
  const theme = useMantineTheme();
  const [values, handlers] = useListState(initialValues);

  const allChecked = values.every((value) => value.checked);
  const intermediate = values.some((value) => value.checked) && !allChecked;

  const items = values.map((value, index) => (
    <Checkbox
      style={{ marginTop: theme.spacing.xs, marginLeft: 33 }}
      label={value.label}
      key={value.key}
      checked={value.checked}
      onChange={(event) => handlers.setItemProp(index, 'checked', event.currentTarget.checked)}
    />
  ));

  return (
    <div>
      <Checkbox
        checked={allChecked}
        intermediate={intermediate}
        label="Receive all notifications"
        onChange={() =>
          handlers.setState((current) =>
            current.map((value) => ({ ...value, checked: !allChecked }))
          )
        }
      />
      {items}
    </div>
  );
}