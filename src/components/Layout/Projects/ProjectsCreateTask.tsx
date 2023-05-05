import { Button, Group, Modal, MultiSelect, Select, SimpleGrid, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import { ChangeEvent, FC, useCallback } from 'react';

import { useActions } from 'hooks/useActions';

import { ITag } from 'shared/types/projects/projects.types';

import { data } from 'configs/projects/getInitialProjects';

interface IForm {
  title: string;
  description: string;
  type: string;
  tags: ITag[];
}

interface IProjectsCreateTask {
  opened: boolean;
  close: () => void;
}

const ProjectsCreateTask: FC<IProjectsCreateTask> = ({ opened, close }) => {
  const actions = useActions();
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      type: '',
      tags: []
    } as IForm
  });

  const onClickSubmitHandler = useCallback((values: IForm) => {
    actions.addNewProjectsState(values);
    showNotification({
      title: 'Great job',
      message: 'Your task was added successfully! 🤥',
      loading: false,
      icon: <IconCheck size={18} />,
      color: 'teal'
    });
    close();
    form.reset();
  }, []);

  const onChangeTypeHandler = useCallback((value: string) => form.setFieldValue('type', value), []);
  const onChangeAreaHandler = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => form.setFieldValue('description', e.target.value), []);

  return (
    <Modal opened={opened} onClose={close} title='Create task'>
      <form onSubmit={form.onSubmit((values: IForm) => onClickSubmitHandler(values))}>
        <div className='flex flex-col gap-2'>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <TextInput
              data-autofocus
              size='md'
              withAsterisk
              required
              label='Your title'
              placeholder='Enter title'
              {...form.getInputProps('title')}
            />
            <Select
              label='Select type your task'
              placeholder='Pick one'
              size='md'
              data={data.map(el => ({ value: el.value, label: el.title }))}
              onChange={onChangeTypeHandler}
              value={form.values.type}
              withAsterisk
              transition='pop-top-left'
              transitionDuration={80}
              transitionTimingFunction='ease'
              required
            />
          </SimpleGrid>

          <MultiSelect
            label='Tags'
            size='md'
            data={form.values.tags.map((el: ITag) => ({ value: el.value, label: el.value }))}
            placeholder='Select tags'
            value={form.values.tags.map((el: ITag) => el.value)}
            creatable
            searchable
            getCreateLabel={query => `+ Create ${query}`}
            onChange={(items: string[]) => {
              const data = items.map(el => ({ value: el }));
              form.setFieldValue('tags', data);
            }}
            onCreate={query => {
              const item = { value: query };
              form.setValues(prev => ({ ...prev, tags: [...form.values.tags, item] }));
              return item;
            }}
          />

          <Textarea
            size='md'
            label='Your message'
            onChange={onChangeAreaHandler}
            value={form.values.description}
            placeholder='Please include all relevant information'
            minRows={3}
          />

          <Group position='right'>
            <Button className='bg-gray' type='submit' size='md' disabled={form.values.title === '' || form.values.type === ''}>
              Add task
            </Button>
          </Group>
        </div>
      </form>
    </Modal>
  );
};

export default ProjectsCreateTask;
