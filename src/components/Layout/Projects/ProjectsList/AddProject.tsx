import { Modal, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

interface IAddProject {
  opened: boolean;
  close: () => void;
  handler: (values: object) => void;
}

const AddProject = ({ opened, close, handler }: IAddProject) => {
  const form = useForm({
    initialValues: {
      name: ''
    }
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title='Create project'>
        <form onSubmit={form.onSubmit((values: object) => handler(values))} className='flex flex-col gap-3'>
          <TextInput data-autofocus withAsterisk required placeholder='Project name' {...form.getInputProps('name')} />
          <Button className='bg-gray' type='submit'>
            Open modal
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AddProject;
