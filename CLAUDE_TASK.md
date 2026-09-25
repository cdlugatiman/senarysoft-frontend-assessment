# Senarysoft Front-End Developer Practical Assessment

## Objective

Recreate the provided **User Management - Edit Users** enterprise dashboard as a polished, functional, responsive frontend.

Primary visual reference:

`assets/reference-user-management.png`

## Technology

- HTML5
- CSS3
- Bootstrap 5
- Vanilla JavaScript
- PHP is optional, but no backend/database is required.

## Required UI

### Top navigation
Include the enterprise-style header shown in the reference:

- Company branding
- Home
- Leads onDemand
- Sales onDemand
- Opportunities
- Content onDemand
- Support onDemand
- Reports onDemand
- Module 8
- Module 9
- Search
- Notifications
- User/profile area

### Left sidebar

Include:

- User management
  - Edit Users (active)
  - Edit Workgroups
- File management
- Site management
- Marketing management
- CRM management
- Critical Metrics

### Main content

Title:

**User Management - Edit Users**

Include:

- Search input
- Search-by-field selector
- Add User button
- Filters control
- Clear Filters
- Status filter
- Region filter
- Division filter
- Responsive user table
- User actions
- Pagination
- Entry count

## User table

Include at least 10 mock users. Prefer 15–20 so pagination can be demonstrated.

Fields:

- ID
- First Name
- Last Name
- Username/Email
- Group
- Division
- Region
- User Type
- Submitted Date
- Enabled Date
- Status

## Functional requirements

The following must actually work:

1. Global search
2. Search by field
3. Status filtering
4. Region filtering
5. Division filtering
6. Clear Filters
7. Pagination
8. Add User
9. Edit User
10. Enable/disable user action
11. Table entry count updates
12. Results update correctly after search/filter changes

No backend or database is necessary. Client-side mock data is sufficient.

## Responsive requirements

The implementation must work on:

- Desktop
- Tablet
- Mobile

Do not merely shrink the desktop interface. Make navigation, filters, table/content, and actions usable at smaller widths.

## Visual direction

Use the reference image as the primary visual source.

Preserve:

- Overall information architecture
- Header/navigation hierarchy
- Sidebar structure
- Main content hierarchy
- Table columns
- Filter placement
- Enterprise/admin-dashboard character
- General proportions and spacing

Reasonable UI/UX improvements are allowed for:

- Accessibility
- Responsive behavior
- Usability
- Clarity
- Consistency

Do not redesign the application into a fundamentally different interface.

## Code quality

- Use semantic HTML.
- Keep JavaScript readable and modular.
- Keep mock data separate from application logic where practical.
- Prefer Bootstrap components where appropriate.
- Avoid unnecessary frameworks and dependencies.
- Avoid overengineering.
- Use accessible labels, buttons, focus states, and appropriate ARIA attributes.
- Do not leave fake controls that appear functional but do nothing.

## Assessment context

The employer explicitly allows AI tools, documentation, and normal development resources.

The candidate may be asked to explain or modify the implementation in a follow-up interview.

Therefore, keep the architecture simple enough to explain confidently.

## QA checklist

Before considering the project complete:

- [ ] Search works
- [ ] Search-by-field works
- [ ] Status filter works
- [ ] Region filter works
- [ ] Division filter works
- [ ] Clear Filters works
- [ ] Pagination works
- [ ] Add User works
- [ ] Edit User works
- [ ] Enable/disable works
- [ ] Entry count is correct
- [ ] Desktop layout checked
- [ ] Tablet layout checked
- [ ] Mobile layout checked
- [ ] Browser console has no errors
- [ ] Assets load correctly
- [ ] Visual comparison against reference completed
- [ ] README accurately describes the final implementation
