describe('Percy Snapshots', () => {
  describe('Spritesheet', () => {
    it('All the icons in one page', () => {
      cy.visit('/')
      cy.percySnapshot('Spritesheet')
    })
  })
})
