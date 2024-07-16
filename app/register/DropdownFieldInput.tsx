import Select from 'react-select';
import { Field } from './registration';

interface Props {
  field: Field<string | null>;
  options: string[];
}

export default function DropdownFieldInput({ field, options }: Props) {
  return (
    <Select
      instanceId={'select-' + field.name}
      placeholder="선택해주세요"
      options={options.map((option) => ({ label: option, value: option }))}
      onChange={(e) => {
        field.value = e?.value ?? null;
      }}
    />
  );
}
