                <button
                  onClick={toggleMaintenanceMode}
                  className={`"w-full px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${maintenanceMode
                    ? 'bg-green-500 text-black hover:bg-green-600'
                    : 'bg-red-500 text-white hover:bg-red-600'
                    } transition-colors`}
                >
                  {maintenanceMode ? 'Disable' : 'Enable'}
                </button>