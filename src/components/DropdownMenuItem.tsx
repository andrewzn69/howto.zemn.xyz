import { Menu } from '@headlessui/react'
import React from 'react'
import type { ReactNode } from 'react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  href: string
  children: ReactNode
}

export default function DropdownMenuItem({ href, children }: Props) {
  return (
    <Menu.Item>
      {({ active }) => (
        <a
          href={href}
          className={classNames(
            active ? 'bg-accent dark:bg-background-popup' : '',
            'block px-4 py-2 text-sm'
          )}
        >
          {children}
        </a>
      )}
    </Menu.Item>
  )
}
