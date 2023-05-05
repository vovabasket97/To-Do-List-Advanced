import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC } from 'react';

import ProjectsCreateTask from './ProjectsCreateTask';

const ProjectsBar: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className='mb-4 justify-end flex'>
      <ProjectsCreateTask opened={opened} close={close} />
      <Button className='bg-gray' onClick={open}>
        Create task
      </Button>
    </div>
  );
};

export default ProjectsBar;
