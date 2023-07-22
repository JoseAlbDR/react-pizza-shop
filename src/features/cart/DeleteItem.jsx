import Button from '../../ui/Button';

function DeleteItem({ onClick }) {
  return (
    <div>
      <Button onClick={onClick} type="small">
        Delete
      </Button>
    </div>
  );
}

export default DeleteItem;
