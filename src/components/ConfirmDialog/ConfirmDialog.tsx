import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Fragment } from 'react'

type ConfirmDialogProps = {
    open: boolean
    setOpen: (open: boolean) => void
    onConfirm: () => void
    title?: string
    description?: string
}

export default function ConfirmDialog({ open, setOpen, onConfirm, title, description }: ConfirmDialogProps) {
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleClickConfirm = () => {
        setOpen(false)
        onConfirm()
    }

    return (
        <Fragment>
            <Button variant='outlined' onClick={handleClickOpen}>
                Open alert dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>{description}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button color='error' onClick={handleClickConfirm} autoFocus>
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}
