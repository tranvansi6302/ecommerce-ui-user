import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import * as React from 'react'

type CustomDialogProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    children?: React.ReactNode
    title?: string
    description?: string
}

export default function CustomDialog({ open, setOpen, children, title, description }: CustomDialogProps) {
    return (
        <React.Fragment>
            <Dialog
                maxWidth='md'
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                {title && (
                    <DialogTitle sx={{ textTransform: 'capitalize' }} id='alert-dialog-title'>
                        {title}
                    </DialogTitle>
                )}
                {description && (
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>{description}</DialogContentText>
                    </DialogContent>
                )}
                {children}
            </Dialog>
        </React.Fragment>
    )
}
