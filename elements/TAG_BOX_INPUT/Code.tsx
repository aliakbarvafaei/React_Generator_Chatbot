import { useEffect, useMemo } from "react";
import { useController, useFormContext } from "react-hook-form";
import { KdpaTypography, KdpaAutoComplete } from "../../../../components";

export interface KdTagBoxInputProps {
  name: string;
  rules?: any;
  autoComplete?: boolean;
  // defaultValueKey?: string;
  defaultValue?: string | number | string[] | number[];
  onChange?: (e: unknown) => void;
  split?: string;
  [x: string]: any;
}

function KdTagBoxInput({
  name = "",
  rules = {},
  options,
  getOptionValue = (option: any) => option.value,
  defaultValue,
  split,
  ...props
}: KdTagBoxInputProps) {
  const { control, setValue } = useFormContext();

  const defaultDropDownValue = useMemo(
    () => (defaultValue ? defaultValue : null),
    [defaultValue]
  );

  useEffect(() => {
    setValue(name, defaultDropDownValue);
  }, [defaultDropDownValue]);

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
    shouldUnregister: true,
    defaultValue: defaultDropDownValue,
  });

  function handleChange(...args: any[]) {
    if (split && split?.length > 0) {
      field.onChange(args[1]?.join(split));
      props?.onChange?.(args[1]?.join(split));
    } else {
      field.onChange(args[1]);
      props?.onChange?.(args[1]);
    }
  }

  return (
    <>
      {/* @ts-ignore */}
      <KdpaAutoComplete
        {...field}
        {...props}
        value={
          split && split?.length > 0 && field?.value
            ? field?.value?.split(split)
            : []
        }
        error={!!error}
        multiple
        freeSolo
        options={options?.map((el: any) => getOptionValue(el)) ?? []}
        onChange={handleChange}
      />

      {error && error.message && (
        <KdpaTypography variant="caption" sx={{ color: "red" }}>
          {error.message}
        </KdpaTypography>
      )}
    </>
  );
}

export default KdTagBoxInput;
