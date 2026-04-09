import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from './Dashboard';

describe('Dashboard Component', () => {
    it('renders the dashboard with correct initial metric values', () => {
        const metrics = { fillLevelPercentage: 65, averageHeightUnits: '26.00', dataPoints: 1000 };
        render(
            <Dashboard 
                fillLevel={65} 
                variance={5} 
                metrics={metrics} 
                setFillLevel={vi.fn()} 
                setVariance={vi.fn()} 
            />
        );

        expect(screen.getByText('SiloHD')).toBeInTheDocument();
        expect(screen.getByText('65%')).toBeInTheDocument();
        expect(screen.getByText('26.00')).toBeInTheDocument();
        expect(screen.getByText('Active Data Points: 1000')).toBeInTheDocument();
    });

    it('calls setFillLevel when the fill level slider is changed', () => {
        const setFillLevelMock = vi.fn();
        render(
            <Dashboard 
                fillLevel={65} 
                variance={5} 
                metrics={null} 
                setFillLevel={setFillLevelMock} 
                setVariance={vi.fn()} 
            />
        );

        // Find the sliders
        const sliders = screen.getAllByRole('slider');
        const fillLevelSlider = sliders[0];

        // Simulate moving the slider to 80
        fireEvent.change(fillLevelSlider, { target: { value: '80' } });
        expect(setFillLevelMock).toHaveBeenCalledWith('80');
    });
});
