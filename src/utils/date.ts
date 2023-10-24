import type {DateType} from 'mobile/../../~/types/date';

export function currentMonth({month, year}: Omit<DateType, 'date'>) {
  const months = [
    {name: 'january', maxDays: 31},
    {name: 'february', maxDays: year % 4 === 0 ? 29 : 28},
    {name: 'march', maxDays: 31},
    {name: 'april', maxDays: 30},
    {name: 'may', maxDays: 31},
    {name: 'june', maxDays: 30},
    {name: 'july', maxDays: 31},
    {name: 'august', maxDays: 31},
    {name: 'september', maxDays: 30},
    {name: 'october', maxDays: 31},
    {name: 'november', maxDays: 30},
    {name: 'december', maxDays: 31},
  ];

  return months[month];
}
