import React, { useCallback, useState } from 'react';

import { TextInput, Select, Button, Paper, Text, Textarea, Group, SimpleGrid, createStyles } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useActions } from 'hooks/useActions';
import { IconCheck } from '@tabler/icons';

import { data } from 'configs/todo/getInitialData';

import styles from './addTask.module.scss';

const useStyles = createStyles(theme => {
  const BREAKPOINT = theme.fn.smallerThan('sm');

  return {
    wrapper: {
      display: 'flex',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      borderRadius: theme.radius.lg,
      padding: 4,
      border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]}`,

      [BREAKPOINT]: {
        flexDirection: 'column'
      }
    },

    form: {
      boxSizing: 'border-box',
      flex: 1,
      padding: theme.spacing.xl,
      borderLeft: 0,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md
      }
    },

    fields: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: -12,
      gap: '16px'
    },

    title: {
      marginBottom: theme.spacing.xl * 1.5,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl
      }
    },

    control: {
      [BREAKPOINT]: {
        flex: 1
      }
    }
  };
});

const AddTask = () => {
  const actions = useActions();
  const { classes } = useStyles();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [desc, setDesc] = useState('');

  const onChangeTitleHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value), []);
  const onChangeAreaHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => setDesc(e.target.value), []);
  const onChangeTypeHandler = useCallback((value: string) => setType(value), []);

  const onClickSubmitHandler = useCallback(() => {
    actions.addNewTodoState({ title, description: desc, type });
    showNotification({
      title: 'Great job',
      message: 'Your task was added successfully! 🤥',
      loading: false,
      icon: <IconCheck size={18} />,
      color: 'teal'
    });
    setTitle('');
    setType('');
    setDesc('');
  }, [actions, desc, title, type]);

  return (
    <div className={styles.addTask}>
      <Paper shadow='md' radius='lg'>
        <div className={classes.wrapper}>
          <form className={classes.form} onSubmit={event => event.preventDefault()}>
            <Text size='xl' weight={700} className={classes.title}>
              Add a new task
            </Text>

            <div className={classes.fields}>
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <TextInput
                  size='md'
                  required
                  placeholder='Enter title'
                  label='Your title'
                  onInput={onChangeTitleHandler}
                  value={title}
                  withAsterisk
                />
                <Select
                  label='Select type your task'
                  placeholder='Pick one'
                  size='md'
                  data={data}
                  onChange={onChangeTypeHandler}
                  value={type}
                  withAsterisk
                  transition='pop-top-left'
                  transitionDuration={80}
                  transitionTimingFunction='ease'
                  required
                />
              </SimpleGrid>

              <Textarea
                size='md'
                label='Your message'
                onChange={onChangeAreaHandler}
                value={desc}
                placeholder='Please include all relevant information'
                minRows={3}
              />

              <Group position='right'>
                <Button
                  type='submit'
                  className={classes.control}
                  size='md'
                  disabled={title === '' || type === ''}
                  onClick={onClickSubmitHandler}
                >
                  Add task
                </Button>
              </Group>
            </div>
          </form>
        </div>
      </Paper>
    </div>
  );
};

export default AddTask;
