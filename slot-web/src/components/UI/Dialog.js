import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ScrollDialog() {
  const [open, setOpen] = React.useState(true);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = scrollType => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} scroll={scroll} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Nisi facilisi id volutpat. Erat fermentum nam donec sit. Luctus phasellus diam parturient dui. Congue nibh nostra congue. Imperdiet
            conubia habitant aenean mauris etiam. Molestie vulputate hac venenatis senectus. Hendrerit ultrices nisl faucibus taciti quam. Tristique volutpat mus augue inceptos ligula? Pretium
            praesent nisl vel at. Senectus pharetra maecenas integer. Ridiculus purus aliquam dapibus porta fames. Vulputate vestibulum euismod tristique sem. Enim fermentum at. Phasellus posuere
            accumsan nunc torquent. Molestie at curabitur feugiat mi nibh. Mus nulla integer montes torqut ultrices nisl faucibus taciti quam. Tristique volutpat mus augue inceptos ligula? Pretium
            praesent nisl vel at. Senectus pharetra maecenas integer. Ridiculus purus aliquam dapibus porta fames. Vulputate vestibulum euismod tristique sem. Enim fermentum at. Phasellus posuere
            accumsan nunc torquent. Molestie at curabitur feugiat mi nibh. Mus nulla integer montes torquent. Litora magna dui porta taciti habitant. Nullam hendrerit eleifend fames. Elementum proin
            semper. Mattis eleifend sem dictum habitasse ultricies. Lorem ipsum odor amet, consectetuer adipiscing elit. Nisi facilisi id volutpat. Erat fermentum nam donec sit. Luctus phasellus diam
            parturient dui. Congue nibh nostra congue. Imperdiet conubia habitant aenean mauris etiam. Molestie vulputate hac venenatis senectus. Hendrerit ultrices nisl faucibus taciti quam.
            Tristique volutpat mus augue inceptos ligula? Pretium praesent nisl vel at. Senectus pharetra maecenas integer. Ridiculus purus aliquam dapibus porta fames. Vulputate vestibulum euismod
            tristique sem. Enim fermentum at. Phasellus posuere accumsan nunc torquent. Molestie at curabitur feugiat mi nibh. Mus nulla integer montes torquent. Litora magna dui porta taciti
            habitant. Nullam hendrerit eleifend fames. Elementum proin semper. Mattis eleifend sem dictum habitasse ultricies. Lorem ipsum odor amet, consectetuer adipiscing elit. Nisi facilisi id
            volutpat. Erat fermentum nam donec sit. Luctus phasellus diam parturient dui. Congue nibh nostra congue. Imperdiet conubia habitant
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
