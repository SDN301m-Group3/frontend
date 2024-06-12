'use client';

import {
    Command,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { useState } from 'react';

interface ICommandProps {
    commands: { value: string; label: string }[];
}

export default function SearchForm({ commands }: ICommandProps) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleValueChange = (value: string) => {
        setInputValue(value);
        setOpen(!!value);
    };

    const filteredCommands = Array.isArray(commands)
        ? commands.filter(command =>
              command.label.toLowerCase().includes(inputValue.toLowerCase())
          )
        : [];
    console.log('filteredCommands', filteredCommands);
    return (
        <Command className="rounded-lg border shadow-md">
            <CommandInput
                placeholder="Type a command or search..."
                onValueChange={handleValueChange}
            />
            {
                <CommandList>
                    {open &&
                        filteredCommands.length > 0 &&
                        filteredCommands.map(command => (
                            <CommandItem
                                key={command.value}
                                value={command.value}
                            >
                                {command.label}
                            </CommandItem>
                        ))}
                </CommandList>
            }
        </Command>
    );
}
