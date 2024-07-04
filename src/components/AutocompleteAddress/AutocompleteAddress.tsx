import { Autocomplete, TextField } from '@mui/material'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { District, Province, Ward } from '~/@types/ghn.type'

type AutocompleteAddressProps = {
    name: string
    control: Control<FieldValues> | any
    data: Province[] | District[] | Ward[]
    errors?: any
    onChange?: (_: any, value: any) => void
    displayLabel: 'ProvinceName' | 'DistrictName' | 'WardName'
    label?: string
    chooseProvince?: any
    chooseDistrict?: any
}

export default function AutocompleteAddress({
    name,
    control,
    data,
    errors,
    onChange,
    displayLabel,
    label,
    chooseProvince,
    chooseDistrict
}: AutocompleteAddressProps) {
    const errorResult = errors && name ? Boolean(errors[name]) : false
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Autocomplete
                    {...field}
                    options={
                        displayLabel === 'DistrictName'
                            ? chooseProvince
                                ? data || []
                                : []
                            : displayLabel === 'WardName'
                              ? chooseDistrict
                                  ? data || []
                                  : []
                              : data || []
                    }
                    getOptionLabel={(option) => option[displayLabel]}
                    fullWidth
                    renderInput={(params) => (
                        <TextField {...params} label={label} error={errorResult} helperText={errors[name]?.message} />
                    )}
                    onChange={(_, value) => {
                        field.onChange(value)
                        if (onChange) {
                            onChange(_, value)
                        }
                    }}
                    isOptionEqualToValue={(option, value) => option[displayLabel] === value?.[displayLabel]}
                    value={field.value || null}
                />
            )}
        />
    )
}
