const initializeCounter = async () => {
    await Counter.findByIdAndUpdate(
      { _id: 'countryId' },
      { $setOnInsert: { sequenceValue: 0 } },
      { upsert: true }
    );
  };
  
  // Call this function during your application startup
  initializeCounter().catch(console.error);
  