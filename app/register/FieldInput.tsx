import { Field, FieldType } from './registration';
import DateFieldInput from './DateFieldInput';
import PhoneNumberFieldInput from './PhoneNumberFieldInput';
import StringFieldInput from './StringFieldInput';
import DropdownFieldInput from './DropdownFieldInput';

interface Props<T> {
  field: Field<T>;
}

export default function FieldInput<T>({ field }: Props<T>) {
  return (
    <div className="mb-3">
      <label className="block">
        {field.name} {field.isRequired ? '*' : ''}
      </label>
      {field.type === FieldType.TIME_SLOT && <></>}
      {field.type === FieldType.STRING && (
        <StringFieldInput field={field as Field<string>} />
      )}
      {field.type === FieldType.OPTIONS && (
        <DropdownFieldInput
          field={field as Field<string | null>}
          options={field.data}
        />
      )}
      {field.type === FieldType.DATE && (
        <DateFieldInput field={field as Field<Date>} />
      )}
      {field.type === FieldType.PHONE && (
        <PhoneNumberFieldInput field={field as Field<string>} />
      )}
    </div>
  );
}
