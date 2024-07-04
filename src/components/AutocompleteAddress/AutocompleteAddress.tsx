import { Autocomplete, TextField } from '@mui/material'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { Fragment } from 'react/jsx-runtime'
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
    placeholder?: string
}

export default function AutocompleteAddress({
    name,
    control,
    data,
    errors,
    onChange,
    displayLabel,
    label,
    placeholder,
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
                    id={name}
                    sx={{ fontSize: '14px' }}
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
                        <Fragment>
                            <label className='text-text-primary text-[14px] inline-block mb-2 capitalize' htmlFor={name}>
                                {label}
                            </label>
                            <TextField
                                {...params}
                                id={name}
                                error={errorResult}
                                helperText={errors[name]?.message}
                                placeholder={placeholder}
                            />
                        </Fragment>
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
