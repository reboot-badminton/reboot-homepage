import { Field } from './registration';
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
      {typeof field.value === 'string' && (
        <>
          {field.name === '전화번호' ? (
            <PhoneNumberFieldInput field={field as Field<string>} />
          ) : (
            <StringFieldInput field={field as Field<string>} />
          )}
        </>
      )}
      {field.value instanceof Date && (
        <DateFieldInput field={field as Field<Date>} />
      )}
      {field.name === '성별' && (
        <DropdownFieldInput
          field={field as Field<string | null>}
          options={['남자', '여자']}
        />
      )}
    </div>
  );
}
