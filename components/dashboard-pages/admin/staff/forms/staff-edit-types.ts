/**
 * Payload for saving staff edit form changes.
 * Maps to PUT /stakeholders/:id and PUT /users/:id.
 */
export type StaffEditSavePayload = {
  stakeholder?: Record<string, unknown>;
  user?: Record<string, unknown>;
};
