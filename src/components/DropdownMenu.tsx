import { Menu, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { IoMenu } from 'react-icons/io5'
import DropdownMenuItem from './DropdownMenuItem'

interface Props {
  tags: string[]
}

export default function DropdownMenu({ tags }: Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className="inline-flex justify-center rounded-md border border-border px-2 py-2 text-sm font-medium shadow-sm hover:bg-orange-light dark:hover:bg-background-main focus:outline-none transition-all"
          aria-label="menu"
        >
          <IoMenu className="h-5 w-5" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md border border-border bg-foreground dark:bg-background-main shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none divide-border0">
          <div className="py-1">
            <div className="px-3 py-2 uppercase font-bold text-xs">
              Categories
            </div>
            {tags.map(tag => {
              return (
                <DropdownMenuItem
                  key={tag}
                  href={`/categories/${tag.toLowerCase()}`}
                >
                  {tag}
                </DropdownMenuItem>
              )
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
