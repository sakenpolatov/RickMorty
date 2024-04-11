import { Loader } from '@mantine/core';
import { Suspense, ReactNode, ComponentType } from 'react';

interface ComponentProps {
  component: ComponentType;
  fallback?: ReactNode | JSX.Element;
  [key: string]: unknown;
}

export function ComponentWithSuspense({
  component: Component,
  fallback = <Loader />,
  ...otherProps
}: ComponentProps) {
  return (
    <Suspense fallback={fallback}>
      <Component {...otherProps} />
    </Suspense>
  );
}
