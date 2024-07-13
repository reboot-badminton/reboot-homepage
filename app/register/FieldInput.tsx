import { Field } from './registration';
import StringFieldInput from './StringFieldInput';

interface Props<T> {
  field: Field<T>;
}

export default function FieldInput<T>({ field }: Props<T>) {
  return (
    <div className="mb-3">
      <label className="block">
        {field.name} {field.isRequired ? '*' : ''}
      </label>
      {typeof field.value === 'string' && (
        <StringFieldInput field={field as Field<string>} />
      )}
    </div>
  );
}
