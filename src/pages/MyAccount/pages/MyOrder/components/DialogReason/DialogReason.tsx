import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import * as React from 'react'

type DialogReasonProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    children?: React.ReactNode
}

export default function DialogReason({ open, setOpen, children }: DialogReasonProps) {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{'Bạn có muốn hủy đơn hàng này?'}</DialogTitle>
                <DialogContent sx={{ width: '500px' }}>
                    <DialogContentText id='alert-dialog-description'>
                        Vui lòng cho chúng tôi biết lý do bạn muốn hủy
                    </DialogContentText>
                </DialogContent>
                {children}
            </Dialog>
        </React.Fragment>
    )
}
