import { Button, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

interface IAddDataItem {
  opened: boolean;
  close: () => void;
  handler: (values: object) => void;
  title: string;
}

const AddDataItem = ({ opened, close, handler, title }: IAddDataItem) => {
  const form = useForm({
    initialValues: {
      name: ''
    }
  });

  return (
    <Modal opened={opened} onClose={close} title={title}>
      <form onSubmit={form.onSubmit((values: object) => handler(values))} className='flex flex-col gap-3'>
        <TextInput data-autofocus withAsterisk required placeholder='Enter name' {...form.getInputProps('name')} />
        <Button className='bg-gray' type='submit'>
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default AddDataItem;
